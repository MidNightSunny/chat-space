# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique :true|
|mail_addless|string|null: false, unique :true|
|password_digest|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|created_at|datatime|null: false|
|updated_at|datatime|null: false|

### Association
- has_many :chatgroups, through: :members
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|messages|text|foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|created_at|datatime|null: false|

### Association
- belongs_to :group
- belongs_to :user

## chatgroupsテーブル

|Column|Type|Options|
|------|----|-------|
|messages|text|foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|created_at|datatime|null: false|

### Association
- has_many :messages
- has_many :users ,through: :members

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|created_time|datatime|null: false|
|updated_at|datatime|null: false|

### Association
- belongs_to :chatgroup
- belongs_to :user