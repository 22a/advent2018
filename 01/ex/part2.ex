defmodule Part2 do
  def solve do
    read_input_lines("../input.txt")
    |> Enum.map(&parse_line/1)
    |> Stream.cycle
    |> Enum.reduce_while({0, MapSet.new()}, &detect_dupe/2)
    |> IO.inspect
  end

  defp read_input_lines(filename) do
    File.read!(filename)
    |> String.trim
    |> String.split("\n")
  end

  defp parse_line(line) do
    {num, _} = Integer.parse(line)
    num
  end

  defp detect_dupe(freqChange, {curFreq, prevFreqs}) do
    nextFreq = curFreq + freqChange
    if MapSet.member?(prevFreqs, nextFreq) do
      {:halt, nextFreq}
    else
      {:cont, {nextFreq, MapSet.put(prevFreqs, nextFreq)}}
    end
  end
end
