from django.contrib import admin
from events.models import Event, Category

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'status', 'creator')
    list_filter = ('status', 'category')
    actions = ['approve_events', 'reject_events']

    def approve_events(self, request, queryset):
        queryset.update(status='approved')
    approve_events.short_description = "Одобрить выбранные события"

    def reject_events(self, request, queryset):
        queryset.update(status='rejected')
    reject_events.short_description = "Отклонить выбранные события"

admin.site.register(Category)
# Register your models here.
