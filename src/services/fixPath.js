export class FixPath {

    static fix(path, params, id = null) {
        for(let key in params) {
            path = path.replace(':'+key, params[key]);
        }

        if(id)
            path = path.replace(':id', id);

        return path;
    }
    
}