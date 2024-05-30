"""eps URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

# from Homepage.views import IndexView

from djpaypal.views import PayView, CrearOrden, CapturarOrdenPaypal



urlpatterns = [
    # path('', include('homepage.urls')),

    path('admin/', admin.site.urls),
    path('api/v1/', include('djoser.urls')),
    path('api/v1/', include('djoser.urls.authtoken')),

    path('api/v1/erp/', include('enterprise_resource_planning_management.urls_api')),
    path('erp/', include('enterprise_resource_planning_management.urls')),

    # path('api/v1/useful_management/', include('useful_management.urls_api')),
    # path('', include('useful_management.urls')),

    
    path('djpaypal/pay/', PayView.as_view(), name='pay'),
    path('api/orders', CrearOrden.as_view(),),
    path('api/orders/<order_id>/capture', CapturarOrdenPaypal.as_view(),),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)