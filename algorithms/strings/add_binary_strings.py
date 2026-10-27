def add_binary_strings(a: str, b: str) -> str:
    """
    Add two binary strings and return the result as a binary string.

    Args:
        a (str): The first binary string.
        b (str): The second binary string.

    Returns:
        str: The sum of the two binary strings as a binary string.
    """
    # Convert binary strings to integers, add them, and convert back to binary
    return bin(int(a, 2) + int(b, 2))[2:]


def add_binary(a: str, b: str) -> str:
    s = ""
    carry = 0
    i = len(a) - 1
    j = len(b) - 1
    print(i)
    print(j)

    while i >= 0 or j >= 0 or carry:
        if i >= 0:
            carry += int(a[i])
            i -= 1
        if j >= 0:
            carry += int(b[j])
            j -= 1

        s = str(carry % 2) + s
        carry = carry // 2
    return s

add_binary("1010", "1011")

# print(add_binary_strings("1101", "1011"))  # Output: "11000"
# print(add_binary("1010", "1011"))  # Output: "10101"
