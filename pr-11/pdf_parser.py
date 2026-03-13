import argparse
import os
import fitz  # PyMuPDF

def parse_pdf(file_path):
    if not os.path.exists(file_path):
        return f"Error: File {file_path} not found."
    
    try:
        doc = fitz.open(file_path)
        full_text = ""
        
        for page_num, page in enumerate(doc):
            # Standard text extraction
            page_text = page.get_text()
            
            if page_text.strip():
                full_text += f"--- Page {page_num + 1} ---\n"
                full_text += page_text + "\n"
        
        return full_text
    except Exception as e:
        return f"Error parsing PDF: {str(e)}"

def main():
    parser = argparse.ArgumentParser(description="Vanilla Resume PDF Parser")
    parser.add_argument("file", help="Path to the PDF file to parse")
    parser.add_argument("--output", "-o", help="Optional output text file")
    
    args = parser.parse_args()
    
    parsed_text = parse_pdf(args.file)
    
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(parsed_text)
        print(f"Parsed content saved to {args.output}")
    else:
        print(parsed_text)

if __name__ == "__main__":
    main()
