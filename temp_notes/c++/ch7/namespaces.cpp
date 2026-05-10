
int generateID() {
  static int s_id{0};
  return s_id++;
}

