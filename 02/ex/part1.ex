defmodule Part1 do
  def solve do
    read_input_lines("../input.txt")
    |> Enum.map(&String.codepoints/1)
    |> Enum.map(&box_id_chars_to_occurrences/1)
    |> Enum.map(&Map.values/1)
    |> Enum.map(&occurrences_to_dupe_tuple/1)
    |> Enum.reduce([0, 0], &dupe_tuples_to_dupe_counts/2)
    |> Enum.reduce(&*/2)
    |> IO.inspect()
  end

  defp read_input_lines(filename) do
    File.read!(filename)
    |> String.trim()
    |> String.split("\n")
  end

  defp box_id_chars_to_occurrences(box_id_chars) do
    Enum.reduce(box_id_chars, Map.new, fn char, acc ->
      {_, new_acc} =
        Map.get_and_update(acc, char, fn current_value ->
          case current_value do
            nil ->
              {current_value, 1}

            _ ->
              {current_value, current_value + 1}
          end
        end)

      new_acc
    end)
  end

  defp occurrences_to_dupe_tuple(occurrences) do
    {Enum.member?(occurrences, 2), Enum.member?(occurrences, 3)}
  end

  defp dupe_tuples_to_dupe_counts({true, true}, [twos, threes]) do
    [twos + 1, threes + 1]
  end
  defp dupe_tuples_to_dupe_counts({true, false}, [twos, threes]) do
    [twos + 1, threes]
  end
  defp dupe_tuples_to_dupe_counts({false, true}, [twos, threes]) do
    [twos, threes + 1]
  end
  defp dupe_tuples_to_dupe_counts(_, acc) do
    acc
  end
end
