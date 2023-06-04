require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');




/**
 * GET/
 * Homepage
 */
exports.homepage = async(req, res) =>{

    try {
        const limitNumber = 5;
        const categories =await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        const Pakistani = await Recipe.find({'category':'Pakistani'}).limit(limitNumber);
        const Thai = await Recipe.find({'category':'Thai'}).limit(limitNumber);
        const Chines = await Recipe.find({'category':'Chines'}).limit(limitNumber);
        const American = await Recipe.find({'category':'American'}).limit(limitNumber);

        const food ={latest  ,Pakistani , Thai , Chines, American};




        res.render('index',{title:'Cooking Blog -Home',categories , food});
        
    } catch (error) {
        res.satus(500).send({message: error.message ||"error acured"});
    }

    
}







/**
 * 
 * Get / categories
 * Categories
 */

exports.explorecategories = async(req, res) =>{

    try {
        const limitNumber = 20;
        const categories =await Category.find({}).limit(limitNumber);

        
        res.render('categories',{title:'Cooking Blog -Categories',categories});
        
    } catch (error) {
        res.satus(500).send({message: error.message ||"error acured"});
    }

    
}




/**
 * 
 * Get / categories / :id
 * Categories By Id
 */

exports.explorecategoriesByID = async(req, res) =>{

    try {

        let categoryId =req.params.id;
        const limitNumber = 20;
        const categoryById =await Recipe.find({'category': categoryId}).limit(limitNumber);
        res.render('categories',{title:'Cooking Blog -Categories',categoryById});
    } catch (error) {
        res.satus(500).send({message: error.message ||"error acured"});
    }

    
}



/**
 * 
 * Get / Recipes/:id
 * Recipe
 */

exports.exploreRecipe = async(req, res) =>{

    try {
       let recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId);
        
    res.render('recipe',{title:'Cooking Blog -Recipe', recipe});
        
    } catch (error) {
        res.satus(500).send({message: error.message ||"error acured"});
    }

    
}

/**
 * 
 * post / Search
 * Search
 */
exports.searchRecipe = async(req, res) =>{
try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find({$text: {$search:searchTerm, $diacriticSensitive:true}});
    res.render('search',{title:'Cooking Blog -Search' , recipe});
}catch (error) {
    res.satus(500).send({message: error.message ||"error acured"});
}

}

/**
 * 
 * Get / explore-Latest
 * Explore Latest
 */

exports.exploreLatest = async(req, res) =>{

    try {

        const limitNumber =20;
        const recipe = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        res.render('explore-latest',{title:'Cooking Blog -Explore Latest', recipe});
    } catch (error) {
        res.satus(500).send({message: error.message ||"error acured"});
    }

    
}


/**
 * 
 * Get / explore-Random
 * Explore Random
 */

exports.exploreRandom = async(req, res) =>{

    try {
        let  count  = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec();
        
        res.render('explore-random',{title:'Cooking Blog -Explore Latest', recipe});
    } catch (error) {
        res.satus(500).send({message: error.message ||"error acured"});
    }

    
}


/**
 * 
 *Get/ Sumit-Recipe
 * Submit recipe
 */

exports.submitRecipe = async(req, res) =>{
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-recipe',{title:'Cooking Blog -Submit Recipe' ,infoErrorsObj, infoSubmitObj});
}

/**
 * Recipe About
 */

exports.aboutRecipe = async(req, res) =>{
    res.render('about-recipe',{title:'Cooking Blog -About Recipe'});
}
/**
 * Contact us 
 */

exports.contactUs = async(req, res) =>{
    res.render('contact',{title:'Cooking Blog -Contact Us'});
}


/**
 * 
 *Post/ Sumit-Recipe
 * Submit recipe
 */

 exports.submitRecipeOnPost = async(req, res) =>{
     
    try {
        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).length==0)
        {
            console.log('NO file here uploaded.');
        }
        else
        {
            imageUploadFile =req.files.image;
            newImageName = Date.now() + imageUploadFile.name;

            uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
            imageUploadFile.mv(uploadPath, function(err){
                if(err) return res.satus(500).send(err);
            })

        }


        const newRecipe = new Recipe({
             name: req.body.name,
            description:req.body.description,
            emial:req.body.email,
            ingredients: req.body.ingredients,
            category:req.body.category,
            image:newImageName
             
        });
        await newRecipe.save();



    req.flash('infoSubmit','Recipe has been added.')
    res.redirect('/submit-recipe');
    } catch (error) {

        req.flash('infoErrors',error);
        res.redirect('/submit-recipe');
    }


    
}


//delte recipe

// async function deleteRecipe()
// {
//     try {
//      await Recipe.deleteOne({name: 'New Recipe KASHMIRI CHAI'});
        
//     } catch (error) {
//         console.log(error);
//     }
// }

// deleteRecipe();










//update recipe


// async function updateRecipe()
// {
//     try {
//         const res = await Recipe.updateOne({name: 'New Recipe'}, {name: 'New Recipe Update'});
//         res.n; //Number of document matched
//         res.nModfied; //Number of documents modified
//     } catch (error) {
//         console.log(error);
//     }
// }

// updateRecipe();


// async function insertDymmyCategoryData()
// {
//     try {
//         await Category.insertMany([
//             {
//                 "name" : "Thai",
//                 "image" : "r1.jpeg"
//             },
//             {
//                 "name" : "turki",
//                 "image" : "r2.jpeg"
//             },
//             {
//                 "name" : "pakistnai",
//                 "image" : "r3.jpeg"
//             },
//             {
//                 "name" : "chines",
//                 "image" : "r4.jpeg"
//             },
//             {
//                 "name" : "Amrican",
//                 "image" : "r5.jpg"
//             },
//             {
//                 "name" : "italian",
//                 "image" : "r6.png"
//             }
           
//         ]);
        
//     } catch (error)

//     {
//         console.log('err', + error);
//     }
// }
// insertDymmyCategoryData();


// async function insertDymmyRecipeData()
// {
//     try {
//         await Recipe.insertMany([
//             {
//                 "name":"Home Made Mix",
//                 "description":`These smoked chicken legs are so versatile and easy! I like to use applewood chips or other fruit woods, but maple is also a great choice. Use your favorite BBQ rub. Letting the legs air-dry in the refrigerator overnight, combined with a higher smoking temperature, helps prevent rubbery skin that is common when smoking chicken. Serve with your favorite BBQ sauce, if desired.
//                 Source: https://www.allrecipes.com/recipe/281393/smoked-chicken-drumsticks/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                     "12 chicken drumsticks",
//                     "¼ cup vegetable oil, or as needed",
//                     "⅓ cup BBQ rub"
//                 ],
//                 "category":"Pakistani",
//                 "image":"r1.jpeg"

//             },
//             {
//                 "name":"SHAMI KEBAB",
//                 "description":`Shami kebab are tender patties made with beef and chana dal (yellow split peas),     then dipped in eggs and pan-fried. These kebabs are kid-friendly, naturally gluten-free, and so wholesome! This easy recipe makes a large batch to enjoy some now, and freeze the rest for later!.
//                 Source:https://www.teaforturmeric.com/shami-kebab/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                    " Step 1: Grind the whole spices to make a shami kabab masala. If you do not have a spice/coffee grinder, you may also use a mortar and pestle, though this will be more tedious.",
//                    "Step 2: Add the beef, lentils (dal/daal), onion, and spices to the Instant Pot or stovetop along with water. Cook. Sauté out extra moisture.",
//                    "Step 3: Pulse to chop up an onion, a green chili pepper, and herbs in a food processor. Remove those and add the beef and lentil mixture. Process until smooth.",
//                    "Step 4: Crack in an egg, mix everything and form into patties. Pan-fry.",
//                    "Step 5: Awe at how simple it was to actually make these treasures all along."

//                 ],
//                 "category":"Pakistani",
//                 "image":"r1.jpeg"

//             },
//             {
//                 "name":"SHAMI KEBAB",
//                 "description":`Shami kebab are tender patties made with beef and chana dal (yellow split peas),     then dipped in eggs and pan-fried. These kebabs are kid-friendly, naturally gluten-free, and so wholesome! This easy recipe makes a large batch to enjoy some now, and freeze the rest for later!.
//                 Source:https://www.teaforturmeric.com/shami-kebab/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                    " Step 1: Grind the whole spices to make a shami kabab masala. If you do not have a spice/coffee grinder, you may also use a mortar and pestle, though this will be more tedious.",
//                    "Step 2: Add the beef, lentils (dal/daal), onion, and spices to the Instant Pot or stovetop along with water. Cook. Sauté out extra moisture.",
//                    "Step 3: Pulse to chop up an onion, a green chili pepper, and herbs in a food processor. Remove those and add the beef and lentil mixture. Process until smooth.",
//                    "Step 4: Crack in an egg, mix everything and form into patties. Pan-fry.",
//                    "Step 5: Awe at how simple it was to actually make these treasures all along."

//                 ],
//                 "category":"Pakistani",
//                 "image":"r1.jpeg"

//             },
//             {
//                 "name":"SEEKH KEBAB",
//                 "description":`A simple, uncomplicated Seekh Kebab recipe made with ingredients you likely have on hand. This recipe includes tips on how to make flavorful, tender kebabs that do not break or fall off the skewers. Includes pan-frying, baking, and air-frying instructions.The word seekh means skewers and kebab means meat cooked over a charcoal fire. So Seekh Kebab means skewered meat sausages cooked over a charcoal fire.
//                 Source:https://www.teaforturmeric.com/baked-pakistani-seekh-kabob/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                    " Onion  I use yellow but red onion also works great.",
//                     "Green chili peppers such as Thai chili A generous amount of green chili peppers are a key element of seekh kebab. The amount in the recipe makes them medium-spicy, so feel free to adjust.",
//                     "Cilantro & mint leaves  Substitute mint leaves with more cilantro leaves if you do not have any on hand.",
//                     "Salt & pepper Adequate salt is important for getting the restaurant-style taste. I have shared my preferred quantity of Mortons kosher salt.",
//                     "Garlic & ginger Again, generously used in restaurants so I have increased the quantity.",
//                     "Red chili flakes  For added flavor and slight heat. Feel free to omit if you would rather skip."
//                 ],
//                 "category":"Pakistani",
//                 "image":"r2.jpeg"

//             },
//             {
//                 "name":"ALOO KI TIKKI",
//                 "description":`This recipe for Pakistani-style potato cakes, called Aloo ki Tikki, is made with mashed potatoes, onions, herbs, and spices. These pan-fried potato cakes are crispy, savory and perfectly spicy! This recipe is also naturally gluten-free and optionally vegan.
//                 Source:https://www.teaforturmeric.com/easy-aloo-ki-tikki-potato-cutlets/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                    " To make these Pakistani-Style Potato Cakes, you simply combine the prepared ingredients, shape them into patties, coat them in an egg wash, and shallow fry. I did my share of experimentation to perfect this Aloo Ki Tikki recipe. Here is what I found:",
//                     "I tried making the tikkis with and without the egg as a binding agent. I found the ones with the egg were easier to shape and held up better. If you want to make them vegan, simply omit the egg within the potato mixture and use breadcrumbs to help bind them from the outside. You will need to be extra gentle when turning them so they retain the shape.",
//                     "To make prep time easier, I omitted any manual chopping by using a food processor. Just use the pulse setting to finely chop the mixture instead of blending it so that the onion does not break down too much and create excess liquid. Of course, you can simply chop if you would rather not us a food processor.",
//                     "Aloo ki Tikki can take a good amount of salt. If you feel something is missing, it is likely an extra dash of salt."
//                 ],
//                 "category":"Pakistani",
//                 "image":"r3.jpeg"

//             },
//             {
//                 "name":"CHICKEN KARAHI",
//                 "description":`Karahi is named after the pan in which it was originally cooked  a heavy, often cast-iron pan that is similar to a wok, but rounder with a flatter base. Traditionally, meat would be simmered and stir-fried in this karahi in an open fire. I have read in multiple places that karahi originates in the Khyber Pakhtunkhwa (formerly Northwest Frontier) province of Pakistan, which makes sense given the cuisines heavy use of meat and black pepper.Chicken karahi is distinguishing features are its rich, tomatoey base and a fragrant finishing of green chili peppers, cilantro, and slivers of ginger.
//                 Source:https://www.teaforturmeric.com/chicken-karahi/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                    " Heat the oil and brown the chopped onions. Sauté the onions until they are lightly golden. Then add garlic, ginger, and green chili pepper. The onions will deepen in color as the aromatics cook.",
//                     "Sauté the chicken. This technique, called bhunai sears the meat and gives it richer flavor and color. A sprinkle of salt here helps layer the flavor.",
//                     "Add the tomatoes, spices, and salt. The moisture from all the tomatoes will be enough to cook the chicken while keeping it moist.",
//                     "Cover & cook. Allowing the chicken to slowly simmer while covered results in tender chicken and well-developed flavors. This also helps the tomatoes break down well.",
//                     "Uncover and stir-fry on high heat to sauté out the water content. You are done once the chicken taking on a glossy appearance as the ghee/oil starts to separate.",
//                     "Stir in the yogurt. I experimented with adding yogurt earlier but found I loved the pronounced taste and consistency it gives when added at the end. After adding the yogurt, continue to cook it through until the oil starts leaving the sides again."
//                 ],
//                 "category":"Chines",
//                 "image":"r4.jpeg"

//             },
//             {
//                 "name":"CHICKEN KARAHI",
//                 "description":`Karahi is named after the pan in which it was originally cooked  a heavy, often cast-iron pan that is similar to a wok, but rounder with a flatter base. Traditionally, meat would be simmered and stir-fried in this karahi in an open fire. I have read in multiple places that karahi originates in the Khyber Pakhtunkhwa (formerly Northwest Frontier) province of Pakistan, which makes sense given the cuisines heavy use of meat and black pepper.Chicken karahi is distinguishing features are its rich, tomatoey base and a fragrant finishing of green chili peppers, cilantro, and slivers of ginger.
//                 Source:https://www.teaforturmeric.com/chicken-karahi/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                    " Heat the oil and brown the chopped onions. Sauté the onions until they are lightly golden. Then add garlic, ginger, and green chili pepper. The onions will deepen in color as the aromatics cook.",
//                     "Sauté the chicken. This technique, called bhunai sears the meat and gives it richer flavor and color. A sprinkle of salt here helps layer the flavor.",
//                     "Add the tomatoes, spices, and salt. The moisture from all the tomatoes will be enough to cook the chicken while keeping it moist.",
//                     "Cover & cook. Allowing the chicken to slowly simmer while covered results in tender chicken and well-developed flavors. This also helps the tomatoes break down well.",
//                     "Uncover and stir-fry on high heat to sauté out the water content. You are done once the chicken taking on a glossy appearance as the ghee/oil starts to separate.",
//                     "Stir in the yogurt. I experimented with adding yogurt earlier but found I loved the pronounced taste and consistency it gives when added at the end. After adding the yogurt, continue to cook it through until the oil starts leaving the sides again."
//                 ],
//                 "category":"Chines",
//                 "image":"r4.jpeg"

//             },
//             {
//                 "name":"CHANA MASALA",
//                 "description":`Chana Masala, or Indian Chickpea Curry, is undoubtedly one of the most popular vegetarian curries in and out of South Asia. This easy & authentic recipe makes tender, flavorful chickpeas in a perfectly spiced curry.If there is one dinner recipe I have turned to for years when I have no time, creativity, or motivation to cook, it is Chana Masala. There is no planning, thawing, or (thanks to canned chickpeas) soaking required. It is a straightforward, one-pot, vegan curry recipe that captures the essence of South Asian cooking.
//                 Source:https://www.teaforturmeric.com/chana-masala/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                    "Sauté onion: Sauté the chopped onions along with cumin seeds to form the base (or masala) of the curry. You want to sauté until golden, but not fully brown, because they all deepen even more in color once you add the garlic and ginger. If at any point the onions start to stick to the pan or brown unevenly, deglaze with 1-2 tablespoons water.",
//                     "Add garlic, ginger, and green chili pepper: Adding the garlic and ginger at this stage cooks out the raw flavor and allows them to become fragrant. The green chili infuses the curry with a subtle warmth. It would be more fiery if added later in cooking.",
//                     "Sauté the tomatoes: Cook the tomatoes for a few minutes to evaporate their water content and help them disintegrate into the curry."
//                 ],
//                 "category":"Chines",
//                 "image":"r5.jpg"

//             },
//             {
//                 "name":"ZUCCHINI (COURGETTE)",
//                 "description":`The original Zucchini Curry recipe adored by thousands! 12 simple ingredients are all you need to transform boring zucchini into this flavorful Indian & Pakistani-style Zucchini (Courgette) Curry, called Toriyan or torai ki sabzi in Urdu. This is an easy, one-pot vegan curry recipe that will have you (and even your kids!) loving Zucchini.
//                 Source:https://www.teaforturmeric.com/pakistani-zucchini-courgette-curry-toriyan-torai-ki-sabzi/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                    "Green Chili Pepper  You can use Serrano, Thai chilis, or other suitable green chili pepper. You need just a small amount to add adequate heat and flavor.",
//                     "Red Chili Powder  This is Pakistani and Indian style red chili powder. Substitute cayenne if you dont have it. Since the spice level of red chili powder varies from brand to brand, start with the smaller amount and increase as desired.",
//                     "Onions This recipe works well with sliced onions (similar to okra curry), which contribute to the overall flavor and texture. For large onions, you may prefer to quarter them before slicing. If you rather just finely chop them, that is okay too."
//                 ],
//                 "category":"Chines",
//                 "image":"r6.png"

//             },
//             {
//                 "name":"MIXED VEGETABLE CURRY",
//                 "description":`Here is a quick and easy Mixed Vegetable Curry recipe that is perfect as a healthy weeknight dinner or simple vegetable side dish. This is an Indian and Pakistani style curry that is naturally vegan and absolutely delicious!
//                 Source:https://www.teaforturmeric.com/easy-mixed-vegetable-curry/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                    "Basic pantry staples like onions, tomatoes, garlic, ginger, green chili peppers, and a handful of spices.",
//                     "Potatoes, peas, and carrots (Aloo Matar Gajar)  The trifecta I grew up eating but you can use any vegetables you like or have on hand.",
//                     "Carrots .Carrots add a beautiful taste to this dish. Depending on the size, I either slice them or halve, then slice them."
//                 ],
//                 "category":"Chines",
//                 "image":"mixedvegi.jpg"

//             },
//             {
//                 "name":"CHICKEN BIRYANI",
//                 "description":`Behold! An authentic Chicken Biryani recipe with simple, easy-to-follow instructions (no curveballs!) and mouthwatering, traditional Pakistani and Indian flavor. This recipe includes tips on how to get fluffy rice, tender chicken, and the distinct biryani taste. Tested to perfection!
//                 Source:https://www.teaforturmeric.com/chicken-biryani/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                    " Oil/Ghee: I have used oil for fluidity and ghee for taste.",
//                     "Onions: You can either thinly slice them (more traditional) or finely chop. If using a food processor to do this, pulse to chop so that it does not blend into a paste.",
//                     "Bone-in, cut up, skinless chicken: I buy pre-cut up pieces of a whole chicken, but bone-in chicken thighs work too. You can also use boneless chicken, though it may require a shorter cooking time.",
//                     " I suggest using aged, long-grain basmati rice you can find at some grocery stores, any Indian/Pakistani specialty store, or online."
//                 ],
//                 "category":"Thai",
//                 "image":"buryani.jpg"

//             },
//             {
//                 "name":"CHICKEN BIRYANI",
//                 "description":`Behold! An authentic Chicken Biryani recipe with simple, easy-to-follow instructions (no curveballs!) and mouthwatering, traditional Pakistani and Indian flavor. This recipe includes tips on how to get fluffy rice, tender chicken, and the distinct biryani taste. Tested to perfection!
//                 Source:https://www.teaforturmeric.com/chicken-biryani/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                    " Oil/Ghee: I have used oil for fluidity and ghee for taste.",
//                     "Onions: You can either thinly slice them (more traditional) or finely chop. If using a food processor to do this, pulse to chop so that it does not blend into a paste.",
//                     "Bone-in, cut up, skinless chicken: I buy pre-cut up pieces of a whole chicken, but bone-in chicken thighs work too. You can also use boneless chicken, though it may require a shorter cooking time.",
//                     " I suggest using aged, long-grain basmati rice you can find at some grocery stores, any Indian/Pakistani specialty store, or online."
//                 ],
//                 "category":"Thai",
//                 "image":"buryani.jpg"

//             },
//             {
//                 "name":"CHICKEN CURRY",
//                 "description":`Here an easy and Authentic Chicken Curry recipe made in the traditional Pakistani and North Indian style. This is a simple, approachable curry recipe that you can make at home in under an hour. Unfussy, with easy-to-follow instructions, and tested to perfection! Serve with basmati rice, and roti or naan for a delicious Pakistani meal.
//                 Source:https://www.teaforturmeric.com/authentic-chicken-curry/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                    "Tomatoes: I typically use Roma, but you can also use vine tomatoes.",
//                     "For the onions: Use the pulse function to very finely chop them. Make sure not to blend them or else they all release water and it all be harder to brown them.",
//                     "Garnishing: A good, preferably homemade garam masala and cilantro are all you need to finish this homey curry."
//                 ],
//                 "category":"Thai",
//                 "image":"chikkencurry.jpg "

//             },
//             {
//                 "name":"MASALA CHAI (TEA)",
//                 "description":`There made-from-concentrate, sharply spiced Chai Tea you get from your local coffee shop. And then theres the authentic version of Spiced Chai (or tea) that we usually call Masala Chai. This easy recipe uses whole spices and tea bags to create a warming, balanced, perfectly spiced cup of Chai. Whatever you are feeling, this will make it better!
//                 Source:https://www.teaforturmeric.com/masala-chai-recipe/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                     "Cinnamon sticks (both Cassia & Ceylon work here)",
//                     "Cloves",
//                     "Green cardamom pods",
//                     "Fennel seeds  Optional, but I love how they make masala chai more vibrant. Some restaurants also use mint leaves which gives a similar, fresh flavor."
//                 ],
//                 "category":"Thai",
//                 "image":"masala_tea.jpg"

//             },
//             {
//                 "name":"Ritzy Ranch Mac",
//                 "description":`These smoked chicken legs are so versatile and easy! I like to use applewood chips or other fruit woods, but maple is also a great choice. Use your favorite BBQ rub. Letting the legs air-dry in the refrigerator overnight, combined with a higher smoking temperature, helps prevent rubbery skin that is common when smoking chicken. Serve with your favorite BBQ sauce, if desired.
//                 Source:https://www.allrecipes.com/recipe/281393/smoked-chicken-drumsticks/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                    " 12 chicken drumsticks",
//                     "¼ cup vegetable oil, or as needed",
//                     "⅓ cup BBQ rub"
//                 ],
//                 "category":"Thai",
//                 "image":"r2.jpeg"

//             },
//             {
//                 "name":"Cookboks Recipe",
//                 "description":`These smoked chicken legs are so versatile and easy! I like to use applewood chips or other fruit woods, but maple is also a great choice. Use your favorite BBQ rub. Letting the legs air-dry in the refrigerator overnight, combined with a higher smoking temperature, helps prevent rubbery skin that is common when smoking chicken. Serve with your favorite BBQ sauce, if desired.
//                 Source:https://www.allrecipes.com/recipe/281393/smoked-chicken-drumsticks/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                    " 12 chicken drumsticks",
//                     "¼ cup vegetable oil, or as needed",
//                     "⅓ cup BBQ rub"
//                 ],
//                 "category":"American",
//                 "image":"r1.jpeg"

//             },
//             {
//                 "name":"KASHMIRI CHAI",
//                 "description":`Instead of hours over the stove, this easy, one-pot Kashmiri Chai recipe takes less than 20 minutes to make! This is not a traditional Noon Chai recipe, but an accessible version that is still delicious (and pink)! See notes on how to make it with regular green tea leaves if you ca not find Kashmiri tea leaves.
//                 Source:https://www.teaforturmeric.com/20-minute-kashmiri-chai-pink-tea/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                     "In the traditional method, you would keep adding cold water to extract the tea leaves and make the concentrate stronger and deeper in flavor.",
//                     "We are still utilizing the chemistry behind pink tea: baking soda, a bit of aerating, and the cold water shock.",
//                     "Using half & half along with the milk gives it a decadent, creamy texture often associated with Kashmiri chai."
//                 ],
//                 "category":"American",
//                 "image":"kashmiri_tea.jpg"

//             },
//             {
//                 "name":"KASHMIRI CHAI",
//                 "description":`Instead of hours over the stove, this easy, one-pot Kashmiri Chai recipe takes less than 20 minutes to make! This is not a traditional Noon Chai recipe, but an accessible version that is still delicious (and pink)! See notes on how to make it with regular green tea leaves if you ca not find Kashmiri tea leaves.
//                 Source:https://www.teaforturmeric.com/20-minute-kashmiri-chai-pink-tea/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                     "In the traditional method, you would keep adding cold water to extract the tea leaves and make the concentrate stronger and deeper in flavor.",
//                     "We are still utilizing the chemistry behind pink tea: baking soda, a bit of aerating, and the cold water shock.",
//                     "Using half & half along with the milk gives it a decadent, creamy texture often associated with Kashmiri chai."
//                 ],
//                 "category":"American",
//                 "image":"kashmiri_tea.jpg"

//             },
//             {
//                 "name":"Home Made Mix",
//                 "description":`These smoked chicken legs are so versatile and easy! I like to use applewood chips or other fruit woods, but maple is also a great choice. Use your favorite BBQ rub. Letting the legs air-dry in the refrigerator overnight, combined with a higher smoking temperature, helps prevent rubbery skin that is common when smoking chicken. Serve with your favorite BBQ sauce, if desired.
//                 Source:https://www.allrecipes.com/recipe/281393/smoked-chicken-drumsticks/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                    " 12 chicken drumsticks",
//                     "¼ cup vegetable oil, or as needed",
//                     "⅓ cup BBQ rub"
//                 ],
//                 "category":"American",
//                 "image":"r3.jpeg"

//             },
//             {
//                 "name":"Home Made Mix",
//                 "description":`These smoked chicken legs are so versatile and easy! I like to use applewood chips or other fruit woods, but maple is also a great choice. Use your favorite BBQ rub. Letting the legs air-dry in the refrigerator overnight, combined with a higher smoking temperature, helps prevent rubbery skin that is common when smoking chicken. Serve with your favorite BBQ sauce, if desired.
//                 Source:https://www.allrecipes.com/recipe/281393/smoked-chicken-drumsticks/`,
//                 "emial":"Ahm@ii.co.pk",
//                 "ingredients":[
//                    " 12 chicken drumsticks",
//                     "¼ cup vegetable oil, or as needed",
//                     "⅓ cup BBQ rub"
//                 ],
//                 "category":"American",
//                 "image":"r3.jpeg"

//             },
           
//         ]);
        
//     } catch (error)

//     {
//         console.log('err', + error);
//     }
// }
// insertDymmyRecipeData();