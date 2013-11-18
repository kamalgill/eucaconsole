# -*- coding: utf-8 -*-
"""
Pyramid views for Eucalyptus and AWS images

"""
from urllib import urlencode

from beaker.cache import cache_region
from pyramid.view import view_config

from ..models import LandingPageFilter
from ..views import LandingPageView


class ImagesView(LandingPageView):
    def __init__(self, request):
        super(ImagesView, self).__init__(request)
        self.initial_sort_key = 'name'
        self.prefix = '/images'

    def get_items(self):
        owner_alias = self.request.params.get('owner_alias')
        if owner_alias is None and self.cloud_type == 'aws':
            # Set default alias to 'amazon' for AWS
            owner_alias = 'amazon'
        owners = [owner_alias] if owner_alias else []
        conn = self.get_connection()
        return self.get_cached_items(conn, owners)

    @staticmethod
    @cache_region('long_term', 'images_cache')
    def get_cached_items(conn, owners):
        """Get images, leveraging Beaker cache for long_term duration (3600 seconds)"""
        return conn.get_all_images(owners=owners) if conn else []

    @view_config(route_name='images', renderer='../templates/images/images.pt')
    def images_landing(self):
        json_items_endpoint = self.request.route_url('images_json')
        if self.request.GET:
            json_items_endpoint += '?{params}'.format(params=urlencode(self.request.GET))
        # Filter fields are passed to 'properties_filter_form' template macro to display filters at left
        owner_choices = (('', 'Anyone'), ('self', 'Me'))
        if self.cloud_type == 'aws':
            owner_choices = (
                ('self', 'Owned by me'),
                ('amazon', 'Amazon AMIs'),
                ('aws-marketplace', 'AWS Marketplace'),
            )
        self.filter_fields = [
            LandingPageFilter(key='owner_alias', name='AWS Images...', choices=owner_choices),
        ]
        # filter_keys are passed to client-side filtering in search box
        self.filter_keys = ['architecture', 'description', 'id', 'name', 'owner_alias']
        # sort_keys are passed to sorting drop-down
        self.sort_keys = [
            dict(key='id', name='ID'),
            dict(key='name', name='Image name'),
            dict(key='architecture', name='Architecture'),
            dict(key='platform', name='Platform'),
            dict(key='description', name='Description'),
        ]

        return dict(
            display_type=self.display_type,
            filter_fields=self.filter_fields,
            filter_keys=self.filter_keys,
            sort_keys=self.sort_keys,
            prefix=self.prefix,
            initial_sort_key=self.initial_sort_key,
            json_items_endpoint=json_items_endpoint,
        )

    @view_config(route_name='images_json', renderer='json', request_method='GET')
    def images_json(self):
        images = []
        for image in self.get_items():
            images.append(dict(
                architecture=image.architecture,
                description=image.description,
                id=image.id,
                kernel_id=image.kernel_id,
                location=image.location,
                name=image.name,
                owner_alias=image.owner_alias,
                platform=image.platform,
                root_device_type=image.root_device_type,
                type=image.type,
            ))
        return dict(results=images)

