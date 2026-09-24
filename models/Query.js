class Query {
  static save(supabase, name, email, message) {
    return supabase
      .from('queries')
      .insert([{ name, email, message }]);
  }

  static getAll(supabase) {
    return supabase
      .from('queries')
      .select('*')
      .order('created_at', { ascending: false });
  }
}

module.exports = Query;
