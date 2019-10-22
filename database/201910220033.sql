create table if not exists auctions (uuid text unique, auctioneer text, profile_id text, start integer, end integer, item_name text, item_lore text, extra text, category text, tier text, starting_bid integer, item_bytes text, claimed boolean, highest_bid_amount integer);
create table if not exists claimed_bidders (uuid text, claimed_bidder text, unique(uuid, claimed_bidder));
create table if not exists bids (uuid text, auction_id text, bidder text, profile_id text, amount integer, timestamp integer, unique(uuid, timestamp));
