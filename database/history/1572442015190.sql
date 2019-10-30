create table if not exists watch (uuid text, item_uuid text, end integer, enabled boolean, unique(uuid, item_uuid))
