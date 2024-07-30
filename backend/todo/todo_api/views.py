import json
from django.urls import include, re_path
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import UntypedToken
from permissions import IsOwner
from .models import Todo
from .serializers import TodoSerializer


class TodoListApiView(APIView):
    # add permission to check if user is authenticated
    authentication_classes = [JWTAuthentication]
    def get_user(self,request):
      token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
      payload = UntypedToken(token).payload;
      return payload['user_id']

    # 1. List all
    def get(self, request, *args, **kwargs):
        '''
        List all the todo items for given requested user
        '''
        user = -1
        try:
          user = self.get_user(request)
        except:
          return Response('token is expired or invalid', status=status.HTTP_401_UNAUTHORIZED);
        todos = Todo.objects.filter(user = user)
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        '''
        Create the Todo with given todo data
        '''
        user = -1
        try:
          user = self.get_user(request)
        except:
          return Response('token is expired or invalid', status=status.HTTP_401_UNAUTHORIZED);
        data = json.loads(request.body)
        data['user'] = user
        serializer = TodoSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TodoDetailApiView(APIView):
    authentication_classes = [JWTAuthentication]
    
    def get_user(self,request):
      '''
        Helper method to parse token
      '''
      token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
      payload = UntypedToken(token).payload;
      return payload['user_id']

    def get_object(self, todo_id, user_id):
        '''
        Helper method to get the object with given todo_id, and user_id
        '''
        try:
            return Todo.objects.get(id=todo_id, user = user_id)
        except Todo.DoesNotExist:
            return None

    # 3. Retrieve
    def get(self, request, todo_id, *args, **kwargs):
        '''
        Retrieves the Todo with given todo_id
        '''
        user = -1
        try:
          user = self.get_user(request)
        except:
          return Response('token is expired or invalid', status=status.HTTP_401_UNAUTHORIZED);
        todo_instance = self.get_object(todo_id, user) # output of all data fields
        if not todo_instance:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = TodoSerializer(todo_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 4. Update
    def put(self, request, todo_id, *args, **kwargs):
        '''
        Updates the todo item with given todo_id if exists
        '''
        user = -1
        try:
          user = self.get_user(request)
        except:
          return Response('token is expired or invalid', status=status.HTTP_401_UNAUTHORIZED);
        todo_instance = self.get_object(todo_id, user)
        if not todo_instance:
            return Response(
                {"res": "Object with todo id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {  # customized data output
            'title': request.data.get('title'),
            'task': request.data.get('task'), 
            'color': request.data.get('color'),
            'bg_color': request.data.get('bg_color'),
        }
        serializer = TodoSerializer(instance = todo_instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 5. Delete
    def delete(self, request, todo_id, *args, **kwargs):
        '''
        Deletes the todo item with given todo_id if exists
        '''
        user = -1
        try:
          user = self.get_user(request)
        except:
          return Response('token is expired or invalid', status=status.HTTP_401_UNAUTHORIZED);
        print(user)
        todo_instance = self.get_object(todo_id, user)
        if not todo_instance:
            return Response(
                {"res": "Object with todo id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        todo_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )