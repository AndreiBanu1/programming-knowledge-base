def is_valid_parentheses(s: str) -> bool:
    pairs: dict[str, str] = {
        ')':'(',
        ']':'[',
        '}':'{',
    }
    
    stack: list[str] = []
    
    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)
    
    return len(stack) == 0

print(is_valid_parentheses("()[]{}")) # true
print(is_valid_parentheses("(]")) # false