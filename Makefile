all: distribute

generate:
	@for i in `ls src/components`;\
    do\
        touch src/theme/${i%.*}.scss;\
    done;
	@rm -f src/theme/.scss;

distribute:
	@cd theme
	@for i in `ls`;\
    do\
      cp $i ../src/components/${i%.*}/style.css;\
    done
	@cd ..
