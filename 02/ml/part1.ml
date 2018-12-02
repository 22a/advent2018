let input_line_opt ic =
  try Some (input_line ic)
  with End_of_file -> None

let read_lines ic =
  let rec aux acc =
    match input_line_opt ic with
    | Some line -> aux (line::acc)
    | None -> (List.rev acc)
  in
  aux []

let lines_of_file filename =
  let ic = open_in filename in
  let lines = read_lines ic in
  close_in ic;
  (lines)

let str_to_char_list s = List.init (String.length s) (String.get s)

let () =
  let lines = lines_of_file "../input.txt" in
	let lines_of_chars = List.map str_to_char_list lines in
	print_string "foo"
