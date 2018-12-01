defmodule Part1 do
  def solve do
    read_input_lines("../input.txt")
    |> Enum.map(&parse_line/1)
    |> Enum.reduce(&+/2)
    |> IO.inspect
  end

  defp read_input_lines (filename) do
    File.read!(filename)
    |> String.trim
    |> String.split("\n")
  end

  defp parse_line (line) do
    {num, _} = Integer.parse(line)
    num
  end
end
