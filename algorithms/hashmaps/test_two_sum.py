"""Seed test showing the Python convention: test_*.py next to the module it tests.

pytest's default import mode puts this file's own directory on sys.path, so a
sibling module is importable by its bare name — which only works because the
file is `two_sum.py` and not `two-sum.py` (hyphens are illegal in module names).
"""

from two_sum import two_sum


def test_finds_the_pair():
    assert two_sum([2, 7, 11, 15], 9) == [0, 1]


def test_uses_the_later_index_second():
    assert two_sum([3, 2, 4], 6) == [1, 2]


def test_handles_a_repeated_value():
    assert two_sum([3, 3], 6) == [0, 1]


def test_returns_empty_when_no_pair_sums_to_target():
    assert two_sum([1, 2, 3], 100) == []
