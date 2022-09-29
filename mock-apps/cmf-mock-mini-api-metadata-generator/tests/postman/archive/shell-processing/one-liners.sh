# 2022-05-21-CMF:
#   Executed from within postman schema subdirectories (e.g., gisdb-public) to find total set
#   of unique primary keys
egrep 'raw.*primaryKeys' mini-api.postman_collection-OLD.json | cut -d = -f 2 | uniq