from rest_framework.permissions import BasePermission, SAFE_METHODS


class ReadOnly(BasePermission):
    """
    Allowing only safe methods of request
    """
    message = {'errors': [
        'Adding, Updating or Deleting request are not allowed.']}

    def has_permission(self, request, view):
        self.message['errors'].clear()
        return request.method in SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in SAFE_METHODS:
            return True

        # Instance must have an attribute named `owner`.
        return obj.createdBy == request.user


class IsCreator(BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """
    message = 'User is not the creator.'

    def has_permission(self, request, view, obj):
        return obj.createdBy == request.user
