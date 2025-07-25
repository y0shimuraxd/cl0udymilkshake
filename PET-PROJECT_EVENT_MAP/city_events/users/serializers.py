from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'token']
        extra_kwargs = {'password': {'write_only': True}}
    
    def get_token(self, obj):
        token, created = Token.objects.get_or_create(user=obj)
        return token.key
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user