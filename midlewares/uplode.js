import multer from "multer";
const storage=multer.memoryStorage()
export const uplode=multer({
    storage,
    limits:{fieldSize:10*1024*1024}
})