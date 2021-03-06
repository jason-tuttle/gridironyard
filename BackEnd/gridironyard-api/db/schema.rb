# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170831191229) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "nfl_players", force: :cascade do |t|
    t.string "name"
    t.string "position"
    t.string "jersey"
    t.text "stats"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "nfl_teams", force: :cascade do |t|
    t.string "name"
    t.string "short_name"
    t.text "schedule"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "player_stats", force: :cascade do |t|
    t.text "passing"
    t.text "rushing"
    t.text "receiving"
    t.text "defense"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "player_id"
    t.index ["player_id"], name: "index_player_stats_on_player_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.string "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "nfl_id"
  end

  create_table "players_users", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "player_id", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.string "picture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "player_stats", "players"
end
