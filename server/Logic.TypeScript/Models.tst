${
	string Extends(Class c) {
		if (c.BaseClass != null)
			return "extends " + SanitizeClassName(c.BaseClass);
		else
			return "";
	}

    string Import(Class c) {
        var imports = "";

        if (c.BaseClass != null)
            imports += "import { " + SanitizeClassName(c.BaseClass) + " } from './" + c.BaseClass.Name + "';\n";

        c.Properties.ToList().ForEach(p => { 
            
            if ((!p.Type.IsPrimitive || p.Type.IsEnum) && !SanitizePropertyTypeName(p).Equals("any")) 
                imports += "import { " + SanitizePropertyTypeName(p).Replace("[", "").Replace("]", "") + " } from './" + p.Type.Name.Replace("[", "").Replace("]", "") + "';\n";
        });

        return imports;
	}

	string SanitizeName(string s) => s.Replace("Dto", "");
	string SanitizeClassName(Class c) => SanitizeName(c.Name);
	string SanitizeEnumName(Enum e) => SanitizeName(e.Name);
	string SanitizePropertyTypeName(Property c) => SanitizeName(c.Type.Name);  
}

$Classes(Logic.Models.*)[
$Import

/** 
	* Class $SanitizeClassName generated from $FullName
	*/
export class $SanitizeClassName $Extends { 
	$Properties[
    public $name: $SanitizePropertyTypeName;
	]
}
]

$Enums(Logic.Models.*)[ 
/**
	* Class $SanitizeEnumName generated from $FullName
	*/
export enum $SanitizeEnumName { 
	$Values[
        $Name = $Value,
	]
}
]