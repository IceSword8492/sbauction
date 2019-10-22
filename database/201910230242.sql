create table if not exists users (uuid text unique, mcid text, dark_theme boolean);
create table if not exists scripts (id integer primary key autoincrement, uuid text, script text, timestamp integer);
create table if not exists watch (id integer primary key autoincrement, uuid text, auction_uuid text, notif boolean);
create table if not exists notification (uuid text unique, item_name boolean, stacks boolean, time_remain boolean, price boolean, bid_amount boolean, avg_price boolean, diff_avg_price boolean, anvil boolean);
