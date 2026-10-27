"""
Bounded pagination configuration for the Briticana API.
Prevents unlimited queryset responses or high-memory page requests.
"""
from rest_framework.pagination import PageNumberPagination


class StandardBoundedPagination(PageNumberPagination):
    """
    Default pagination enforcing a 20-item default page and a strict 50-item maximum.
    """

    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 50
