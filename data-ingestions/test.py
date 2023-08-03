# from django.test import TestCase
# from django.core.management import call_command, CommandError


# Create your tests here.

# Test management command
# https://adamj.eu/tech/2020/09/07/how-to-unit-test-a-django-management-command/
# https://docs.djangoproject.com/en/4.2/ref/django-admin/#django.core.management.call_command


# class CommandTestCase(TestCase):
#     def test_batch_add_users_command(self):
#         self.assertEqual(self.radius_batch_model.objects.all().count(), 0)
#         path = self._get_path('static/test_batch.csv')
#         options = dict(file=path, expiration='28-01-2018', name='test')
#         self._call_command('batch_add_users', **options)
#         self.assertEqual(self.radius_batch_model.objects.all().count(), 1)
#         radiusbatch = self.radius_batch_model.objects.first()
#         self.assertEqual(get_user_model().objects.all().count(), 3)
#         self.assertEqual(radiusbatch.expiration_date.strftime('%d-%m-%y'), '28-01-18')
#         path = self._get_path('static/test_batch_new.csv')
#         options = dict(file=path, name='test1')
#         self._call_command('batch_add_users', **options)
#         self.assertEqual(self.radius_batch_model.objects.all().count(), 2)
#         self.assertEqual(get_user_model().objects.all().count(), 6)
#         invalid_csv_path = self._get_path('static/test_batch_invalid.csv')
#         with self.assertRaises(CommandError):
#             options = dict(file='doesnotexist.csv', name='test3')
#             self._call_command('batch_add_users', **options)
#         with self.assertRaises(SystemExit):
#             options = dict(file=invalid_csv_path, name='test4')
#             self._call_command('batch_add_users', **options)

# from io import StringIO

# class ClosepollTest(TestCase):
#     def test_command_output(self):
#         out = StringIO()
#         call_command('closepoll', stdout=out)
#         self.assertIn('Expected output', out.getvalue())