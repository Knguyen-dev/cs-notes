

int return5() {
  return 5;
}

int main() {

  int x{1};
  int y{2};

  x = y;     // y produces an rvalue (2) and assigned to x.
  x = x + 1; //  
  return 0;
}

