import sys
from holehe.core import holehe

def run(email):
    holehe_obj = holehe.Holehe(email)
    # Utilisez holehe_obj comme vous le souhaitez...

if __name__ == "__main__":
    run(sys.argv[1])
