from rest_framework import serializers
from user_api.models import AppUser

class UserRegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = AppUser
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ('email')