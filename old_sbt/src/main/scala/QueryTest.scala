import com.mongodb.casbah.Imports._
import java.io._
import scala.collection.mutable._

object QueryTest {
  def main(args: Array[String]) {
    val mongoConn = MongoClient()
    val mongoColl = mongoConn("raw")("article")


    
  }
}
