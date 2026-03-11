import os
import sys

filepath = r"c:\Users\temny\OneDrive\Рабочий стол\Сайт\index.html"
try:
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # Sanitize existing HTML comments to prevent nested comments from breaking the outer block
    text = text.replace('<!--', '< ! - -').replace('-->', '- - >')

    # Find the body tags
    body_start_idx = text.find('<body>')
    body_end_idx = text.rfind('</body>')

    if body_start_idx != -1 and body_end_idx != -1:
        insert_idx = body_start_idx + len('<body>')
        
        new_text = text[:insert_idx] + '\n<!-- =================SITE COMMENTED OUT=================\n' + text[insert_idx:body_end_idx] + '\n=================END SITE COMMENTED OUT================= -->\n' + text[body_end_idx:]

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_text)
        print("Successfully commented out the website content in index.html.")
    else:
        print("Couldn't find <body> and </body> tags.")
except Exception as e:
    print(f"Error: {e}")
