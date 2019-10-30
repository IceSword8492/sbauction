create table if not exists notification (uuid text, auction_uuid text, enabled boolean, unique(uuid, auction_uuid))
