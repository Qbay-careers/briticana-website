import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export type ResumeUploadResult = {
  key: string;
  url: string;
  fileName: string;
};

function sanitizeFileName(name: string): string {
  return name.replace(/[^\w.\-()+ ]+/g, "_").replace(/\s+/g, "_").slice(0, 120);
}

function buildResumeFileName(firstName: string, lastName: string, originalName: string): string {
  const ext = originalName.includes(".") ? originalName.slice(originalName.lastIndexOf(".")) : ".pdf";
  const stamp = new Date().toISOString().slice(0, 10);
  return sanitizeFileName(`${lastName}_${firstName}_Resume_${stamp}${ext}`);
}

function getR2Endpoint(accountId: string): string {
  const custom = process.env.R2_S3_ENDPOINT?.trim();
  if (custom) return custom.replace(/\/$/, "");
  return `https://${accountId}.r2.cloudflarestorage.com`;
}

function getR2Client(): S3Client {
  const accountId = process.env.R2_ACCOUNT_ID?.trim();
  const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("R2 credentials are not configured.");
  }

  if (accountId === accessKeyId) {
    throw new Error(
      "R2_ACCOUNT_ID must be your Cloudflare Account ID (Dashboard → Account ID), not the R2 Access Key ID.",
    );
  }

  return new S3Client({
    region: "auto",
    endpoint: getR2Endpoint(accountId),
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  });
}

export function isR2Configured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID?.trim() &&
      process.env.R2_ACCESS_KEY_ID?.trim() &&
      process.env.R2_SECRET_ACCESS_KEY?.trim() &&
      process.env.R2_BUCKET_NAME?.trim(),
  );
}

function buildPublicUrl(key: string): string {
  const base = process.env.R2_PUBLIC_BASE_URL?.trim().replace(/\/$/, "");
  if (base) return `${base}/${key}`;
  return key;
}

/** Uploads a resume to Cloudflare R2 (S3-compatible API). */
export async function uploadResumeToR2(
  file: Buffer,
  mimeType: string,
  originalFileName: string,
  applicant: { firstName: string; lastName: string },
): Promise<ResumeUploadResult> {
  const bucket = process.env.R2_BUCKET_NAME?.trim();
  if (!bucket) {
    throw new Error("R2_BUCKET_NAME is not configured.");
  }

  const fileName = buildResumeFileName(applicant.firstName, applicant.lastName, originalFileName);
  const key = `resumes/${new Date().getFullYear()}/${crypto.randomUUID()}_${fileName}`;

  const client = getR2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file,
      ContentType: mimeType,
    }),
  );

  return {
    key,
    url: buildPublicUrl(key),
    fileName,
  };
}
