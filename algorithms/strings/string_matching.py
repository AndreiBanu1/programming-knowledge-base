def string_matching(words: list[str]) -> list[str]:
    result = []
    
    for i in range(len(words)):
        for j in range(i+1, len(words)):
            if words[j] in words[i] and words[j] not in result:
                result.append(words[j])
            if words[i] in words[j] and words[i] not in result:
                result.append(words[i])
    
    return result