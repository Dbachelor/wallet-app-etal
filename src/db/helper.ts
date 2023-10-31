import datasource from "datasource.config";

export const findValue = async (repo, id) =>  await datasource
.getRepository(repo)
.createQueryBuilder("user")
.where("user.id = :id", { id: id })
.getOne()