<!-- Student ID:2018229033
      Student Name: YihaiDuan
      Date:2019.2.23
      File:add todo php file -->
<?php
	$fp = fopen($note_dir, 'r+');
     if ($fp) {
          $i = 1;
          while (!feof($fp)) {
               if ($i == 2) {
                    fseek($fp, 0, SEEK_CUR);
                    fwrite($fp, "Last Modified Time ".get_date());
                    break;
               }
               fgets($fp);
               $i++;
          }
          fclose($fp);
     } 
	$new_note = trim($_POST["new_todo"]);
	$new_note = "\n".$new_note;
	file_put_contents($note_dir, $new_note,FILE_APPEND);
?>