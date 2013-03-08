import com.mongodb.casbah.Imports._
import java.io._
import scala.collection.mutable._

object MongoTest {
  def main(args: Array[String]) {
    
    println("BLup")
    val mongoClient = MongoClient()
    val mongoColl = mongoClient("raw")("article")
    
    /*val user1 = MongoDBObject("user" -> "bwmcadams", "email" -> "~~brendan~~<AT>10genDOTcom")
    val user2 = MongoDBObject("user" -> "someOtherUser")
    mongoColl += user1
    mongoColl += user2
    */ 
    
    val reader : BufferedReader = new BufferedReader(new FileReader("/home/ubuntu/meteowrite/src/main/resources/sacbee_pubsys_stories.csv"));
    var line = reader.readLine()
    val globalHash = new ArrayBuffer[HashMap[String,String]]() 
    while(line != null) {
      val info = line.split(",", -1)
      if (info.length >= 8)  {
        val tmpHash = new HashMap[String,String]()
        tmpHash.put("id", info(0)) 
        tmpHash.put("headline", info(1))
        tmpHash.put("byline", info(2))
        tmpHash.put("credit line", info(3))
        tmpHash.put("source", info(4))
        tmpHash.put("sections", info(5))
        tmpHash.put("url", info(6))
        tmpHash.put("body", info(7))
        globalHash.append(tmpHash)
        val tmpMDBO = MongoDBObject("id"-> info(0), "headline"-> info(1), "byline"-> info(2), "credit line"-> info(3), "source"-> info(4), "sections"-> info(5), "url"-> info(6), "body"-> info(7))
        mongoColl += tmpMDBO
      }
      line = reader.readLine()
      
    }
    reader.close()
    println(globalHash(2))
    println(globalHash.size)
     
  
  }
}
