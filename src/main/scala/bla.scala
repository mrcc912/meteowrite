import com.mongodb.casbah.Imports._

object Clup {
  def main(args: Array[String]) {
    println("BLup")
    val mongoClient = MongoClient()
    val mongoColl = mongoClient("test")("test")
    val user1 = MongoDBObject("user" -> "bwmcadams","email" -> "~~brendan~~<AT>10genDOTcom")
    val user2 = MongoDBObject("user" -> "someOtherUser")
    mongoColl += user1
    mongoColl += user2
    for { x <- mongoColl } println(x) 
  }
}
