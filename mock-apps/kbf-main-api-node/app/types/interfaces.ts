export interface DBObject {
  schemaname: string,
  tablename:  string,
  tableowner: string,
  tablespace: string | null,
  hasindexes: boolean,
  hasrules: boolean,
  hastriggers: boolean,
  rowsecurity: boolean
}

export interface ModelObject{
  
}