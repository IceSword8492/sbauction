create table if not exists watch (uuid text, item_uuid text, end integer, ended boolean, unique(uuid, item_uuid))
