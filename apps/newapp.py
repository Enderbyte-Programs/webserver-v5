"""Automatically generate new Enderbyte Programs Web App entries"""

import json
import shutil

APP_INDEX = "appindex.json"
DEFAULT_LOGO = "logo.png"
APP_PREFIX = "/apps/"

def read_json_file(filepath:str) -> dict:
    with open(filepath) as f:
        d = json.load(f)
    return d

def write_json_file(filepath:str,data:dict) -> None:
    with open(filepath,"w+") as f:
        f.write(json.dumps(data,indent=4))

def get_input(prompt:str) -> str:
    return input(prompt+" >")

def main():
    print("Application Adder")
    data = read_json_file(APP_INDEX)
    newdict = {}
    bname = get_input("Application Directory Name")

    #Copy bare template
    shutil.copytree("_template",bname)

    newdict["dir"] = APP_PREFIX + bname + "/"
    newdict["img"] = APP_PREFIX + bname + "/" + DEFAULT_LOGO
    newdict["title"] = get_input("Application Title")
    newdict["description"] = get_input("Application Description")
    newdict["tags"] = get_input("Keywords /  Tags").split(",")

    #Edit index.html
    nfp = bname+"/index.html"
    with open(nfp) as f:
        htd = f.read()
    with open(nfp,"w+") as f:
        
        f.write(
            htd.replace("#TT",newdict["title"])\
            .replace("#DX",get_input("SEO Description"))\
            .replace("#KW",",".join(newdict["tags"]))
        )

    data["apps"].append(newdict)
    write_json_file(APP_INDEX,data)

if __name__ == "__main__":
    main()