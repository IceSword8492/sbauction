create table if not exists watch (uuid text, auction_uuid text, end integer, enabled boolean, unique(uuid, auction_uuid))
