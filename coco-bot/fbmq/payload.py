from . import utils


class Payload(object):
    def __init__(self, recipient, message=None, sender_action=None, notification_type=None, tag=None):
        self.recipient = recipient
        self.message = message
        if sender_action is not None and sender_action not in ['typing_off', 'typing_on', 'mark_seen']:
            raise ValueError('invalid sender_action : it must be one of "typing_off","typing_on","mark_seen"')

        self.sender_action = sender_action

        if notification_type is not None \
                and notification_type not in ['REGULAR', 'SILENT_PUSH', 'NO_PUSH']:
            raise ValueError('invalid notification_type : it must be one of "REGULAR","SILENT_PUSH","NO_PUSH"')

        self.notification_type = notification_type

        valid_tags = ["PAIRING_UPDATE", "APPLICATION_UPDATE", "ACCOUNT_UPDATE", "PAYMENT_UPDATE", "PERSONAL_FINANCE_UPDATE", "SHIPPING_UPDATE", "RESERVATION_UPDATE", "ISSUE_RESOLUTION", "APPOINTMENT_UPDATE", "GAME_EVENT", "TRANSPORTATION_UPDATE", "FEATURE_FUNCTIONALITY_UPDATE", "TICKET_UPDATE"]
        if tag is not None and tag not in valid_tags:
            raise ValueError('invalid tag: it must be one of ' + ', '.join(['"{}"'.format(v) for v in valid_tags]))
        self.tag = tag

    def to_json(self):
        return utils.to_json(self)

    def __eq__(self, other):
        if isinstance(other, str):
            return other == self.to_json()
        return utils.to_json(other) == self.to_json()


class Recipient(object):
    def __init__(self, id=None, phone_number=None):
        self.id = id
        if phone_number is not None:
            self.phone_number = phone_number


class Message(object):
    """
    https://developers.facebook.com/docs/messenger-platform/send-api-reference#message
    Message object can contain text, attachment, quick_replies and metadata properties
    """

    def __init__(self, text=None, attachment=None, quick_replies=None, metadata=None):
        if text is not None and attachment is not None:
            raise ValueError('Please set only one parameter "text" or "attachment"')
        if not isinstance(quick_replies, list) and quick_replies is not None:
            raise ValueError('quick_replies type must be "list"')

        self.text = text
        self.attachment = attachment
        self.quick_replies = Message.convert_shortcut_quick_reply(quick_replies)
        self.metadata = metadata

    @staticmethod
    def convert_shortcut_quick_reply(items):
        """
        support shortcut [{'title':'title', 'payload':'payload'}]
        """
        if items is not None and isinstance(items, list):
            result = []
            for item in items:
                if isinstance(item, QuickReply):
                    result.append(item)
                elif isinstance(item, dict):
                    result.append(QuickReply(title=item.get('title'), payload=item.get('payload')))
                else:
                    raise ValueError('Invalid quick_replies variables')
            return result
        else:
            return items


class QuickReply(object):
    def __init__(self, title, payload):
        self.title = title
        self.payload = payload
        self.content_type = 'text'
