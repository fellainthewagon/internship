/* eslint-disable */
const { promises: fs } = require("fs");
const FilesService = require("./filesService");

jest.mock("../models/File.js");
const File = require("../models/File");
const { uploadsFolder } = require("../config");
const filesService = new FilesService();
fs.unlink = jest.fn();
fs.readdir = jest.fn();

const files = [
  {
    filename: "779f8e6c-4f2f-40e5-be0a-05abcc188a5d.gif",
    originalname: "test-gif.gif",
    mimetype: "image/gif",
    path: "uploads/779f8e6c-4f2f-40e5-be0a-05abcc188a5d.gif",
    _id: "6158660d6793b031ab6724e1",
  },
];
const { filename, originalname, path, mimetype } = files[0];
const file = { filename, originalname, path, mimetype };
const id = "6158660d6793b031ab6724e1";

beforeEach(() => jest.clearAllMocks());

describe("'FilesService' testing", () => {
  it("'getAll' method, if files in DB", async () => {
    File.find.mockResolvedValue(files);

    expect(await filesService.getAll()).toEqual(files);
    expect(File.find).toHaveBeenCalledWith({});
    expect(File.find).toHaveBeenCalledTimes(1);
  });

  it("'getAll' method, if files are not in DB", async () => {
    File.find.mockResolvedValue([]);

    await expect(filesService.getAll()).rejects.toThrowError();
    expect(File.find).toHaveBeenCalledWith({});
    expect(File.find).toHaveBeenCalledTimes(1);
  });

  it("'create' method", async () => {
    File.create.mockResolvedValue(files[0]);

    expect(await filesService.create(file)).toEqual(files[0]);
    expect(File.create).toHaveBeenCalledWith({
      filename,
      originalname,
      mimetype,
      path,
    });
    expect(File.create).toHaveBeenCalledTimes(1);
  });

  it("'deleteOne' method, if file is in DB", async () => {
    File.findByIdAndDelete.mockResolvedValue(files[0]);
    fs.unlink.mockResolvedValue();

    expect(await filesService.deleteOne(id)).toBeUndefined();
    expect(File.findByIdAndDelete).toHaveBeenCalledWith({ _id: id });
    expect(File.findByIdAndDelete).toHaveBeenCalledTimes(1);
    expect(fs.unlink).toHaveBeenCalledWith(files[0].path);
    expect(fs.unlink).toHaveBeenCalledTimes(1);
  });

  it("'deleteOne' method, if file is not in DB", async () => {
    File.findByIdAndDelete.mockResolvedValue();

    await expect(filesService.deleteOne(id)).rejects.toThrowError();
  });

  it("'deleteAll' method, if files are in DB", async () => {
    const files = ["779f8e6c-4f2f-40e5-be0a-05abcc188a5d.gif"];
    File.deleteMany.mockResolvedValue({ deletedCount: 1 });
    fs.readdir.mockResolvedValue(files);
    fs.unlink.mockResolvedValue();

    expect(await filesService.deleteAll()).toBeUndefined();
    expect(File.deleteMany).toHaveBeenCalledWith({});
    expect(File.deleteMany).toHaveBeenCalledTimes(1);
    expect(fs.readdir).toHaveBeenCalledWith(uploadsFolder);
  });

  it("'deleteAll' method, if files are not in DB", async () => {
    File.deleteMany.mockResolvedValue({ deletedCount: 0 });

    await expect(filesService.deleteAll()).rejects.toThrowError();
  });
});
