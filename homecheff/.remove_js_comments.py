from pathlib import Path

root = Path(r"c:\Users\LUIZALEXANDRENISHIYA\home-cheff-app\homecheff")


def strip_comments(text: str) -> str:
    out = []
    i = 0
    state = "code"
    quote = None
    escape = False

    while i < len(text):
        ch = text[i]
        nxt = text[i + 1] if i + 1 < len(text) else ""

        if state == "code":
            if ch in ("'", '"', "`"):
                state = "string"
                quote = ch
                out.append(ch)
                i += 1
                continue

            if ch == "/" and nxt == "/":
                i += 2
                while i < len(text) and text[i] != "\n":
                    i += 1
                continue

            if ch == "/" and nxt == "*":
                i += 2
                while i < len(text) - 1 and not (text[i] == "*" and text[i + 1] == "/"):
                    i += 1
                if i < len(text) - 1:
                    i += 2
                continue

            out.append(ch)
            i += 1
            continue

        out.append(ch)
        if escape:
            escape = False
        elif ch == "\\":
            escape = True
        elif ch == quote:
            state = "code"
            quote = None
        i += 1

    return "".join(out)


for path in root.rglob("*.js"):
    text = path.read_text(encoding="utf-8")
    path.write_text(strip_comments(text), encoding="utf-8")

print("comentarios_removidos")
