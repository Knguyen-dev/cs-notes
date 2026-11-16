class TimeMap:
    def __init__(self):
        self.kv_store = {}

    def set(self, key: str, value: str, timestamp: int) -> None:
        # If not in store, create the array
        if key not in self.kv_store:
            self.kv_store[key] = []
        self.kv_store[key].append((value, timestamp))
        
    def get(self, key: str, timestamp: int) -> str:
        # Return empty string if it's not in the kv-store
        if key not in self.kv_store:
            return ""

        arr = self.kv_store[key]
        i, j = 0, len(arr) - 1
        res = ""
        while (i <= j):
            m = (i+j) // 2
            mid_element = arr[m]
            if (mid_element[1] == timestamp):
                return mid_element[0]
            elif mid_element[1] > timestamp:
                j = m - 1
            else:
                res = arr[m][0]
                i = m + 1

        # Return the value of the 'res' tuple.
        return res