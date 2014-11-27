define([
    'underscore', 'backbone', 'models/room'
], function(_, Backbone, ChatRoom) {
    var RootItemView = Backbone.View.extend({
        model: ChatRoom,
        tagName: 'a',
        className: 'list-group-item',
        template: '#room-tpl',
        attributes: {
            target: '_blank'
        },
        initialize: function() {
            var search = location.search.split('=');
            this.currentCid = search[1] || '';
        },
        render: function() {
            var template = _.template($(this.template).html());
            this.$el.html(template(this.model.toJSON()));
            this.$el.attr({
                'href': location.origin + '/?cid=' + this.model.get('id'),
                'data-chat': this.model.get('id')
            });
            if (this.currentCid == this.model.get('id')) {
                this.$el.addClass('active');
            }
            return this;
        }
    });
    return RootItemView;
});