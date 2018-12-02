defmodule Part2 do
  def solve do
    read_input_lines("../input.txt")
    |> find_one_diff_matches()
    |> format_result()
    |> IO.inspect()
  end

  defp read_input_lines(filename) do
    File.read!(filename)
    |> String.trim()
    |> String.split("\n")
  end

  defp find_one_diff_matches(ids) do
    for id <- ids, has_one_diff_match?(ids, id), do: id
  end

  defp has_one_diff_match?(ids, id) do
    Enum.find(ids, fn inner_id ->
      diff = String.myers_difference(id, inner_id)
      # let's abuse the builtin `String.myers_difference`. the expression below
      # evaluates to true if the strings differ by exactly one char
      # (this is terribly inefficient)
      Enum.count(diff) <= 4
      && is_binary(diff[:del])
      && is_binary(diff[:ins])
      && String.length(diff[:del]) === 1
      && String.length(diff[:ins]) === 1
    end)
  end

  defp format_result([id_a, id_b]) do
    String.myers_difference(id_a, id_b)
    |> Keyword.get_values(:eq)
    |> Enum.reduce(&++/2)
  end
end
