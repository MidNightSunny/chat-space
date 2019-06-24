# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique :true|
|mail_addless|string|null: false, unique :true|
|password_digest|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|created_at|datetime|null: false|
|updated_at|datetime|null: false|

### Association
- has_many :chatgroups, through: :members
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|messages|text|foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|created_at|datetime|null: false|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|messages|text|foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|created_at|datetime|null: false|
|updated_at|datetime|null: false|

### Association
- has_many :messages
- has_many :users ,through: :members

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|created_time|datetime|null: false|
|updated_at|datetime|null: false|

### Association
- belongs_to :group
- belongs_to :user