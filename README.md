# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique :true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- has_many :chatgroups, through: :members
- has_many :contents

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|content|text| |
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|messages|text|foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many :contents
- has_many :users ,through: :members

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user